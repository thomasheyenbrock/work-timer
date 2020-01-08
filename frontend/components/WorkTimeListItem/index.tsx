import React, { useCallback } from "react";
import { Formik } from "formik";
import TrashIcon from "../../icons/Trash2";
import TimeField from "../TimeField";
import {
  useUpdateWorkTimeMutation,
  useDeleteWorkTimeMutation,
  WeekdaysQuery,
  WeekdaysQueryVariables,
  WeekdaysDocument,
  WorkTime
} from "../../generated/apollo-components";
import FlatButton from "../FlatButton";
import { parseISO, format, parse, isValid } from "date-fns";
import TextField from "../TextField";

const WorkTimeListItem: React.FC<{
  workTime: WorkTime;
  weekdayId: string;
  date: Date;
  weekdayQueryVariables: {
    startDate: string;
    endDate: string;
  };
}> = props => {
  const [updateWorkTime] = useUpdateWorkTimeMutation();
  const [deleteWorkTime] = useDeleteWorkTimeMutation({
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const weekdaysQueryResult = cache.readQuery<
        WeekdaysQuery,
        WeekdaysQueryVariables
      >({
        query: WeekdaysDocument,
        variables: props.weekdayQueryVariables
      });
      if (!weekdaysQueryResult || !weekdaysQueryResult.weekDays) {
        return;
      }
      cache.writeQuery({
        query: WeekdaysDocument,
        variables: props.weekdayQueryVariables,
        data: {
          weekDays: weekdaysQueryResult.weekDays.map(weekday =>
            weekday.id === props.weekdayId
              ? {
                  ...weekday,
                  workTimes: weekday.workTimes.filter(
                    workTime => workTime.id !== data.deleteWorkTime.id
                  )
                }
              : weekday
          )
        }
      });
    }
  });
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateWorkTime({
        variables: {
          id: props.workTime.id,
          start: e.target.value,
          end: props.workTime.end
        },
        optimisticResponse: {
          __typename: "Mutation",
          updateWorkTime: {
            ...props.workTime,
            start: e.target.value
          }
        }
      });
    },
    [props.workTime.id, props.workTime.end]
  );
  return (
    <Formik
      initialValues={{
        start: props.workTime.start
          ? format(parseISO(props.workTime.start), "HH:ss")
          : "00:00",
        end: props.workTime.end
          ? format(parseISO(props.workTime.end), "HH:ss")
          : "00:00"
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const parsedStart = parse(values.start, "HH:ss", new Date(props.date));
        const parsedEnd = parse(values.end, "HH:ss", new Date(props.date));
        if (!isValid(parsedStart) || !isValid(parsedEnd)) {
          setSubmitting(false);
          return;
        }
        await updateWorkTime({
          variables: {
            id: props.workTime.id,
            start: parsedStart.toISOString(),
            end: parsedEnd.toISOString()
          },
          optimisticResponse: {
            __typename: "Mutation",
            updateWorkTime: {
              ...props.workTime,
              start: parsedStart.toISOString(),
              end: parsedEnd.toISOString()
            }
          }
        });
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <div className="inline">
          <TextField
            label="Von"
            placeholder="00:00"
            value={values.start}
            onChange={handleChange}
            onBlur={handleBlur}
            name="start"
            debouncedHandleChange={handleSubmit}
          />
          <TextField
            label="Von"
            placeholder="00:00"
            value={values.end}
            onChange={handleChange}
            onBlur={handleBlur}
            name="end"
            debouncedHandleChange={handleSubmit}
          />
          <FlatButton>
            <TrashIcon
              onClick={() => {
                deleteWorkTime({
                  variables: { id: props.workTime.id },
                  refetchQueries: [""]
                });
              }}
            />
          </FlatButton>
          <style jsx>{`
            .inline {
              display: flex;
            }
          `}</style>
        </div>
      )}
    </Formik>
  );
};

export default WorkTimeListItem;
