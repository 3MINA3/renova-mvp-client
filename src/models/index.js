
export class Address {
    constructor({ id, city, street } = {}) {
    this.id = id || null;
    this.city = city || '';
    this.street = street || '';
  }
}

export class User {
    constructor({ id, name, email, phoneNumbers = [], dateOfBirth, address, deliveryAddresses = [] } = {}) {
    this.id = id || null;
    this.name = name || '';
    this.email = email || '';
    this.phoneNumbers = phoneNumbers;
    this.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
    this.address = address instanceof Address ? address : new Address(address || {});
    this.deliveryAddresses = deliveryAddresses.map(addr => addr instanceof Address ? addr : new Address(addr || {}));
  }

    get age() {
    if (!this.dateOfBirth) return null;
    const today = new Date();
    let age = today.getFullYear() - this.dateOfBirth.getFullYear();
    const m = today.getMonth() - this.dateOfBirth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.dateOfBirth.getDate())) {
      age--;
    }
    return age;
  }
}

export class Product {
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
    constructor({ id, address, description, determinedPrice, status, date, image, type, weight, userId, userName, phone } = {}) {
    this.id = id || null;
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
