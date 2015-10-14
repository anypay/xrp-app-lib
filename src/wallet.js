import Errors from './errors';
import Account from './account';
import * as rippleLib from 'ripple-lib';

export default class Wallet extends Account {

  constructor(options) {
    super({
        publicKey: 'rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe'
    })
    var wallet;

    if (!options) {
      wallet = rippleLib.Wallet.generate();
      this._balance = 0;
    } else {
      if (options._privateKey) return new Wallet({
          privateKey: options._privateKey
      });

      if (rippleLib.Seed.is_valid(options.privateKey)) {
        var secret = options.privateKey;
        wallet = new rippleLib.Wallet(secret);
        wallet.address = wallet.getAddress().value;
        this._balance = undefined;
      } else {
        throw new Errors.InvalidPrivateKey
      }
    }
    this._publicKey = wallet.address;
    this._privateKey = wallet.secret;
  }

  static generate() {
    var wallet = rippleLib.Wallet.generate();
    return new Wallet({ privateKey: wallet.secret });
  }

  get privateKey() {
    return this._privateKey;
  }

  sendPayment(options) {
    var _this = this;
    var remote = new rippleLib.Remote({
      servers: [
        { host: 's1.ripple.com', port: 443, secure: true }
      ]
    });
    return new Promise(function(resolve, reject) {
      remote.connect(function(err, res) {
        if (err) { return reject(err) }
        remote.setSecret(_this.publicKey, _this.privateKey) 

        const transaction = remote.createTransaction('Payment', {
          account: _this.publicKey,
          destination: options.to.publicKey,
          amount: options.amount * 1000000
        })

        if (options.destination_tag) {
          transaction.setDestinationTag(options.destination_tag)
        }
  
        transaction.submit(function(error, response) {
          remote.disconnect();
          if (error) { return reject(error) };
          resolve(response);
        });
      });
    });
  }
}

