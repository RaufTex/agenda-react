import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar, Box, Button, Icon, IconButton } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
  getCalendarsEndpoint,
  getEventsEndpoint,
  ICalendar,
  IEvent,
} from './backend';
import './backend';
import { getToday, formatMonth, prevMonth, addMonths } from './dateFunctions';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { CalendarsView } from './CalendarsView';
import { CalendarHeader } from './CalendarHeader';

const useStyles = makeStyles({
  table: {
    borderTop: '1px solid rgb(224,224,224)',
    minHeight: '100%',
    tableLayout: 'fixed',
    '& td ~ td, & th ~ th': {
      borderLeft: '1px solid rgb(224,224,224)',
    },
    '& td': {
      verticalAlign: 'top',
      overflow: 'hidden',
      padding: '8 px 4px',
    },
  },
  dayOfMonth: {
    display: 'inline-block',
    fontWeight: 500,
    width: '24px',
    lineHeight: '24px',
    marginBottom: '4px',
    borderRadius: '50%',
    '&.today': {
      backgroundColor: '#3f51b5',
      color: 'white',
    },
  },
  event: {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    whitSpace: 'nowrap',
    margin: '4px 0',
  },
  eventBackground: {
    display: 'inline-block',
    color: 'white',
    padding: '2px 4px',
    borderRadius: '4px',
  },
});

interface ICalendarProps {
  weeks: ICalendarCell[][];
  onClickDay: (date: string) => void;
  onClickEvent: (event: IEvent) => void;
}

const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

export const Calendar = React.memo(function (props: ICalendarProps) {
  const { weeks } = props;
  const classes = useStyles();

  function handleClick(evt: React.MouseEvent, date: string) {
    if (evt.target === evt.currentTarget) {
      props.onClickDay(date);
    }
  }

  return (
    <TableContainer style={{ flex: '1' }} component={'div'}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {DAYS_OF_WEEK.map(day => (
              <TableCell align='center' key={day}>
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {weeks.map((week, i) => (
            <TableRow key={i}>
              {week.map(cell => (
                <TableCell
                  align='center'
                  key={cell.date}
                  onClick={me => handleClick(me, cell.date)}
                >
                  <div
                    className={
                      classes.dayOfMonth +
                      (cell.date === getToday() ? ' today' : '')
                    }
                  >
                    {cell.dayOfMonth}
                  </div>

                  {cell.events.map(event => {
                    const color = event.calendar.color;

                    return (
                      <button
                        key={event.id}
                        className={classes.event}
                        onClick={() => props.onClickEvent(event)}
                      >
                        {event.time && (
                          <>
                            <Icon style={{ color }} fontSize='inherit'>
                              watch_later
                            </Icon>
                            <Box component='span' margin='0 4px'>
                              {event.time}
                            </Box>
                          </>
                        )}
                        {event.time ? (
                          <span>{event.desc}</span>
                        ) : (
                          <span
                            className={classes.eventBackground}
                            style={{ backgroundColor: color }}
                          >
                            {event.desc}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export type IEventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventWithCalendar[];
}
