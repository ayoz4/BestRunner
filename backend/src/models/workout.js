export default class Workout {
  id = "";
  distance = -1;
  date = -1;
  type = "";
  comment = "";

  constructor(id, distance, date, type, comment) {
    this.id = id;
    this.distance = distance;
    this.date = date;
    this.type = type;
    this.comment = comment;
  }
}
