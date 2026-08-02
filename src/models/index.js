// src/models/index.js

export class Address {
  /**
   * @param {Object} params
   * @param {string|number} params.id
   * @param {string} params.city
   * @param {string} params.street
   */
  constructor({ id, city, street } = {}) {
    this.id = id || null;
    this.city = city || '';
    this.street = street || '';
  }
}

export class User {
  /**
   * @param {Object} params
   * @param {string|number} params.id
   * @param {string} params.name
   * @param {string} params.email
   * @param {Array<string>} params.phoneNumbers
   * @param {string|Date} params.dateOfBirth
   * @param {Address|Object} params.address
   * @param {Array<Address|Object>} params.deliveryAddresses
   */
  constructor({ id, name, email, phoneNumbers = [], dateOfBirth, address, deliveryAddresses = [] } = {}) {
    this.id = id || null;
    this.name = name || '';
    this.email = email || '';
    this.phoneNumbers = phoneNumbers; // Array of phone numbers
    this.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
    this.address = address instanceof Address ? address : new Address(address || {});
    this.deliveryAddresses = deliveryAddresses.map(addr => addr instanceof Address ? addr : new Address(addr || {}));
  }

  /**
   * Calculates the age automatically based on dateOfBirth
   * @returns {number|null} Age in years
   */
  get age() {
    if (!this.dateOfBirth) return null;
    const today = new Date();
    let age = today.getFullYear() - this.dateOfBirth.getFullYear();
    const m = today.getMonth() - this.dateOfBirth.getMonth();
    // If the current month is before the birth month, or if it's the same month but the current day is before the birth day
    if (m < 0 || (m === 0 && today.getDate() < this.dateOfBirth.getDate())) {
      age--;
    }
    return age;
  }
}

export class Product {
  /**
   * @param {Object} params
   * @param {string|number} params.id
   * @param {string} params.name
   * @param {string} params.description
   * @param {number} params.price
   * @param {string} params.image
   * @param {string} params.category
   */
  constructor({ id, name, description, price, image, category } = {}) {
    this.id = id || null;
    this.name = name || '';
    this.description = description || '';
    this.price = price || 0;
    this.image = image || '';
    this.category = category || '';
  }
}

export class PurchaseOrder {
  /**
   * @param {Object} params
   * @param {string|number} params.id
   * @param {string|Date} params.date
   * @param {string} params.status
   * @param {number} params.totalAmount
   * @param {string|number} params.userId
   * @param {string} params.userName
   * @param {string} params.userEmail
   * @param {string} params.phone
   * @param {string|Address} params.address
   * @param {Array} params.items
   */
  constructor({ id, date, status, totalAmount, userId, userName, userEmail, phone, address, items = [] } = {}) {
    this.id = id || null;
    this.date = date ? new Date(date) : new Date();
    this.status = status || 'pending';
    this.totalAmount = totalAmount || 0;
    this.userId = userId || null;
    this.userName = userName || '';
    this.userEmail = userEmail || '';
    this.phone = phone || '';
    this.address = typeof address === 'object' ? (address instanceof Address ? address : new Address(address || {})) : address || '';
    this.items = items;
  }
}

export class SellOrder {
  /**
   * @param {Object} params
   * @param {string|number} params.id
   * @param {Address|Object|string} params.address
   * @param {string} params.description
   * @param {number} params.determinedPrice
   * @param {string} params.status
   * @param {string|Date} params.date
   * @param {string} params.image
   * @param {string} params.type
   * @param {number} params.weight
   * @param {string|number} params.userId
   * @param {string} params.userName
   * @param {string} params.phone
   */
  constructor({ id, address, description, determinedPrice, status, date, image, type, weight, userId, userName, phone } = {}) {
    this.id = id || null;
    // Address could be a string or an Address object depending on requirements, handling as Address object for consistency
    this.address = typeof address === 'object' ? (address instanceof Address ? address : new Address(address || {})) : address || '';
    this.description = description || '';
    this.determinedPrice = determinedPrice || 0;
    this.status = status || 'pending';
    this.date = date ? new Date(date) : new Date();
    this.image = image || '';
    this.type = type || '';
    this.weight = weight || 0;
    this.userId = userId || null;
    this.userName = userName || '';
    this.phone = phone || '';
  }
}
