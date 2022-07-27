// Stwórz system zarządzania i kontroli układem satelit umożliwiających połączenie z interenetem z każdego miejsca na globie
// W projekcie powinny zostać odwzorowane poszczególne elementy
// pojedyncza satelita
// grupa satelit
// opertator
// Overlord - big boss z uprawnieniami administratora

import Validator from "../Validator";

// Location Class
// Satelites Handlers
//   list of single satellites
//   list of groups of satellites

class Operator {
  // Ma miec: imie, nazwisko, uuid
  // Ma umożliwiać:
  // - zmianę wysokości i wpółrzędnych pojedynczych satelit
  // - zmianę wysokości i wpółrzędnychcałej grupy
  // - otwieranie i składanie żagli słonecznych dla pojedynczego egzemplarza jak i całej grupy
  // - właczanie i wyłączanie sygnału nadawczego dla pojedynczych satelit oraz grup
  // - może tworzyć nowe grupy
}

class Overlord {
  // Ma mieć: imie, nazwisko, uuid
  // Ma umożliwiać:
  // - to samo co zwykły operator
  // - może wyłączyć poszczególne satelity, wybrane grupy lub cały system (wszystkie dostępne satelity)
}
