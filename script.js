let userData = {
    'USD': 1000,
    'EUR': 900,
    'UAH': 15000,
    'BIF': 20000,
    'AOA': 100
},
bankData = {
    'USD': {
        max: 3000,
        min: 100,
        img: '💵'
    },
    'EUR': {
        max: 1000,
        min: 50,
        img: '💶'
    },
    'UAH': {
        max: 0,
        min: 0,
        img: '💴'
    },
    'GBP': {
        max: 10000,
        min: 100,
        img: '💷'
    }
}

function getMoney(userData, bankData) {
    return new Promise((resolve, reject) => {
        const viewBalance = prompt('Переглянути баланс картки? Так/Ні').toLowerCase();

        viewBalance === 'так'
            ? (() => {
                let currency = prompt('Введіть валюту до якої буде відображатися баланс: USD, EUR, UAH, GBP').toUpperCase();
                while (!userData.hasOwnProperty(currency)) {
                    currency = prompt('Ви ввели недійсну валюту. Введіть дійсну валюту: USD, EUR, UAH, GBP').toUpperCase();
                }
                console.log(`Баланс становить: ${userData[currency]} ${currency}`);
                resolve(userData);
            })()
            : viewBalance === 'ні'
                ? (() => {
                    let cashCurrency = prompt('Введіть валюту для зняття готівки').toUpperCase();
                    while (!userData.hasOwnProperty(cashCurrency)) {
                        cashCurrency = prompt('Ви ввели недійсну валюту. Введіть дійсну валюту: USD, EUR, UAH, GBP').toUpperCase();
                    }
                    const cashValue = +prompt('Введіть суму яку бажаєте зняти');

                    if (bankData.hasOwnProperty(cashCurrency) && 
                        cashValue >= bankData[cashCurrency].min && 
                        cashValue <= bankData[cashCurrency].max) {
                        console.log(`Ось ваша готівка: ${cashValue} ${cashCurrency} ${bankData[cashCurrency].img}`);
                        resolve(userData);
                    } else if (cashValue < bankData[cashCurrency].min) {
                        console.error(`Введена сума менша за дозволений мінімум. Мінімальна сума для зняття: ${bankData[cashCurrency].min}`);
                        reject({ userData, bankData });
                    } else if (cashValue > bankData[cashCurrency].max) {
                        console.error(`Введена сума перевищує дозволений максимум. Максимальна сума для зняття: ${bankData[cashCurrency].max}`);
                        reject({ userData, bankData });
                    }
                })()
                : reject({ userData, bankData });
    })
        .then(() => console.log('Операція виконана успішно'))
        .catch(() => console.error('Операція скасована або виникла помилка'))
        .finally(() => console.log('Дякую, гарного дня 😊'));
}

getMoney(userData, bankData);