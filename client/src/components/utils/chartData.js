import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

export const createWeeksFromDates = (dates) => {
  const sortedDates = dates.sort(
    (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()
  );

  const startDate = moment(sortedDates[0]?.date)
  const endDate = moment(sortedDates[sortedDates.length - 1]?.date)

  const monthRange = moment.range(startDate, endDate);

  const result = new Map();

  for (const week of monthRange.by("days")) {
    result.set(week.isoWeek(), 0);

    for (const workout of sortedDates) {
      let currentWeek = moment(workout.date).isoWeek()

      if (week.isoWeek() === currentWeek) {
        result.set(week.isoWeek(), result.get(week.isoWeek()) + workout.distance);
      }
    }
  }

  return result;
};
