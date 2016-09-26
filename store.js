"use strict";

class Customer {
    constructor(data) {
        this._data = data;
    }

    get name() {return this._data.name; }
    get rentals() {return this._data.rentals.map(r => new Rental(r)); }
}

class Rental {
    constructor(data) {
        this._data = data;
    }

    get days() {return this._data.days;}
    get movieID() {return this._data.movieID; }
}

function statement(customerArg, movies) {
    const customer = new Customer(customerArg);

    let result = `Rental Record for ${customer.name}\n`;

    for (let r of customer.rentals) {
        result += `\t${movieFor(r).title}\t${amountFor(r)}\n`;
    }
    result += `Amount owed is ${totalAmount()}\n`;
    result += `You earned ${totalFrequentRenterPoints()} frequent renter points\n`;
    return result;

    function totalFrequentRenterPoints() {
        let result = 0;
        for (let r of customer.rentals) {
            result += frequentRenterPointsFor(r);
        }
        return result;
    }

    function totalAmount() {
        let result = 0;
        for (let r of customer.rentals) {
            result += amountFor(r);
        }
        return result;
    }

    function movieFor(rental) {
        return movies[rental.movieID];
    }

    function amountFor(r) {
        let thisAmount = 0;

        // determine amount for each movie
        switch (movieFor(r).code) {
            case "regular":
                thisAmount = 2;
                if (r.days > 2) {
                    thisAmount += (r.days - 2) * 1.5;
                }
                break;
            case "new":
                thisAmount = r.days * 3;
                break;
            case "childrens":
                thisAmount = 1.5;
                if (r.days > 3) {
                    thisAmount += (r.days - 3) * 1.5;
                }
                break;
        }

        return thisAmount;
    }

    function frequentRenterPointsFor(r) {
        return (movieFor(r).code === "new" && r.days > 2) ? 2 : 1;
    }
}

let customer = {
    name: "martin",
    rentals: [{
        "movieID": "F001",
        "days": 3
    }, {
        "movieID": "F002",
        "days": 1
    },]
};

let movies = {
    "F001": {
        "title": "Ran",
        "code": "regular"
    },
    "F002": {
        "title": "Trois Couleurs: Bleu",
        "code": "regular"
    },
    // etc
};

console.log(statement(customer, movies));