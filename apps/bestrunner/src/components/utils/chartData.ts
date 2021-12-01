// import Moment from "moment";
import { extendMoment } from "moment-range";
import { Workout } from "../../redux/types";
import * as Moment from "moment";

const moment = extendMoment(Moment);

export const createWeeksFromDates = (dates: Workout[]) => {
  const sortedDates = dates.sort(
    (a: Workout, b: Workout) =>
      //@ts-ignore
      moment(a.date).valueOf() - moment(b.date).valueOf()
  );

  const startDate = moment(sortedDates[0]?.date);
  const endDate = moment(sortedDates[sortedDates.length - 1]?.date);

  const monthRange = moment.range(startDate, endDate);

  const result = new Map<number, number>();

  //@ts-ignore
  for (const week of monthRange.by("days")) {
    result.set(week.isoWeek(), 0);

    for (const workout of sortedDates) {
      let currentWeek = moment(workout.date).isoWeek();

      if (week.isoWeek() === currentWeek) {
        result.set(
          week.isoWeek(),
          result.get(week.isoWeek()) + workout.distance
        );
      }
    }
  }

  return result;
};
