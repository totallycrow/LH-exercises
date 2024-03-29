// Stwórz system zarządzania i kontroli układem satelit umożliwiających połączenie z interenetem z każdego miejsca na globie
// W projekcie powinny zostać odwzorowane poszczególne elementy
// pojedyncza satelita
// grupa satelit
// opertator
// Overlord - big boss z uprawnieniami administratora

// Location Class
// Satelites Handlers
//   list of single satellites
//   list of groups of satellites

// class Overlord {
// Ma mieć: imie, nazwisko, uuid
// Ma umożliwiać:
// - to samo co zwykły operator
// - może wyłączyć poszczególne satelity, wybrane grupy lub cały system (wszystkie dostępne satelity)
// }

import Operator from "./classes/Operator.js";
import Overlord from "./classes/Overlord.js";

const operator = new Operator("John", "Wayne");
const overlord = new Overlord("Max", "Payne");

// CR NOTES

// INTERFACE WITH SINGLETON? -> GROUPMANAGER

// PRIVATE WITH INTERFACE? -> GROUPMANAGER
// private' modifier cannot appear on a type member.ts(1070)
// should not define private values in interface, but getter methods instead? -> GroupOfSatellites

// MAPS?
// -> sets for Satellites IDs
