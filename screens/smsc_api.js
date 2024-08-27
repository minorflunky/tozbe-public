import { Platform } from 'react-native';

class SmscApi {
  constructor() {
    this.ssl = false;
    this.def_fmt = 3;
    this.host = 'smsc.kz';
    this.charset = 'utf-8';
    this.login = "login";
    this.password = "password";
    this.sender = null;
    this.log = console.log;
  }

  PHONE_TYPES = {
    'string': 1,
    'number': 2
  };

  getHost(www = '') {
    return 'https://smsc.kz/sys/';
  }

  isInArr(arr, val) {
    if (!arr || !arr.length) return false;
    return arr.indexOf(val) !== -1;
  }

  convertData(data, notConvert) {
    if (data.fmt) delete data.fmt;
    if (data.msg) {
      data.mes = data.msg;
      delete data.msg;
    }
    if (data.message) {
      data.mes = data.message;
      delete data.message;
    }
    if (data.phone && !this.isInArr(notConvert, 'phone')) {
      data.phones = data.phone;
      delete data.phone;
    }
    if (data.number) {
      data.phones = data.number;
      delete data.number;
    }

    if (data.list) {
      let list = '';
      for (let i in data.list) {
        list += `${i}:${data.list[i]}\n`;
      }
      data.list = list;
      delete data.mes;
    }

    if (data.phones && !(typeof data.phones in this.PHONE_TYPES)) {
      data.phones = data.phones.join(',');
    }
  }

  async readUrl(prs, notConvert) {
    const fmt = prs.fmt ? prs.fmt : this.def_fmt;

    let formData = new FormData();
    formData.append('fmt', fmt);
    formData.append('login', this.login);
    formData.append('psw', this.password);
    formData.append('charset', this.charset);
    if (prs.type) formData.append(prs.type, '1');

    if (prs.data) {
      this.convertData(prs.data, notConvert);

      for (let i in prs.data) {
        formData.append(i, prs.data[i]);
      }
    }

    let www = '';
    let count = 0;

    const submit = async () => {
      try {
        const response = await fetch(this.getHost(www) + prs.file, {
          method: 'POST',
          body: formData,
        });
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fullData = await response.text();
        const d = JSON.parse(fullData);
        return {
          data: d,
          fullData,
          error: d.error_code ? d.error : null,
          errorCode: d.error_code ? d.error_code : null
        };
      } catch (err) {
        if (count++ < 5) {
          www = `www${count !== 1 ? count : ''}.`;
          return submit();
        } else {
          const error = {
            error: "Connection Error",
            error_code: 100
          };
          return {
            data: error,
            fullData: JSON.stringify(error),
            error: error.error,
            errorCode: error.error_code
          };
        }
      }
    };

    return submit();
  }

  configure(prs) {
    this.ssl = !!prs.ssl;
    this.login = prs.login;
    this.password = prs.password;
    if (prs.charset) this.charset = prs.charset;
  }

  async send(type, data) {
    if (typeof data !== 'object') data = {};
    const opts = {
      file: 'send.php',
      data: data,
      type: type
    };
    return this.readUrl(opts);
  }

  async sendSms(data) {
    if (typeof data !== 'object') data = {};
    return this.readUrl({
      file: 'send.php',
      data: data
    });
  }

  async getStatus(data) {
    if (data.phones) {
      data.phone = data.phones;
      delete data.phones;
    }
    if (data.number) {
      data.phone = data.number;
      delete data.number;
    }

    if (data.phone && !(typeof data.phone in this.PHONE_TYPES)) {
      data.phone = data.phone.join(',');
    }

    return this.readUrl({
      file: 'status.php',
      data: data
    }, ['phone']);
  }

  async getBalance() {
    const result = await this.readUrl({
      file: 'balance.php',
      data: {
        cur: 1
      }
    });
    return {
      balance: result.error ? 0 : result.data.balance,
      ...result
    };
  }

  async getSmsCost(data) {
    if (typeof data !== 'object') data = {};
    if (!data.cost) data.cost = 1;
    const result = await this.readUrl({
      file: 'send.php',
      data: data
    });
    return {
      cost: result.error ? 0 : result.data.cost,
      ...result
    };
  }

  async raw(file, data) {
    return this.readUrl({
      file: file,
      data: data
    });
  }

  async test() {
    const result = await this.readUrl({
      file: 'balance.php'
    });
    return result;
  }
}

export default new SmscApi();