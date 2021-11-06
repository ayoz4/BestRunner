import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

export const createWeeksFromDates = (dates) => {
  const endDate = moment.max(
    dates.map((value) => {
      const currentDate = new Date(value.date);

      return moment([
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
      ]);
    })
  );
  const startDate = moment.min(
    dates.map((value) => {
      const currentDate = new Date(value.date);

      return moment([
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
      ]);
    })
  );

  const monthRange = moment.range(startDate, endDate);

  const result = new Map();

  for (const week of monthRange.by("week")) {
    result.set(week.week(), 0);

    for (const workout of dates) {
      let currentDate = new Date(workout.date);
      let currentWeek = moment([
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
      ]).isoWeek();

      if (week.isoWeek() === currentWeek) {
        result.set(week.week(), result.get(week.week()) + workout.distance);
      }
    }
  }

  return result;
};
