import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getUser(userKey){
    return this.get('users', userKey);
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.delete('users', userKey);
  }

  getUsers(){
    return this.getAll('users');
  }

  searchUsers(searchValue){
    return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  getLoggedInUser(email)
  {
    return this.db.collection('users', ref => ref.where('email', '==', email))
      .get()
  }

  createUser(value){
    var finalVal = {
      name: value.name,
      email: value.email,
      mobile: value.mobile,
      nameToSearch: value.name.toLowerCase(),
      password: value.password,
      role: 'Customer'
    };
    return this.create('user', finalVal);
  }

  create(table, value) {
    return this.db.collection(table).add(value);
  }

  update(table, key, value) {
    return this.db.collection(table).doc(key).set(value);
  }

  get(table, key) {
    return this.db.collection(table).doc(key).snapshotChanges();
  }

  getAll(table) {
    return this.db.collection(table).snapshotChanges();
  }

  delete(table, key) {
    return this.db.collection(table).doc(key).delete();
  }
}
