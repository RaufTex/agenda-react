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
  IUser,
} from './backend';
import './backend';
import { formatMonth, addMonths } from './dateFunctions';
import { Link } from 'react-router-dom';
import { CalendarsView } from './CalendarsView';
import UserMenu from './UserMenu';

interface ICalendarHeaderProps {
  month: string;
}

export const CalendarHeader = React.memo(function (
  props: ICalendarHeaderProps
) {
  const { month } = props;

  return (
    <Box display='flex' alignItems='center' padding='8px 16px'>
      <Box>
        <IconButton
          aria-label='Mês anterior'
          component={Link}
          to={'/calendar/' + addMonths(month, -1)}
        >
          <Icon>chevron_left</Icon>
        </IconButton>
        <IconButton
          aria-label='Próximo Mês'
          component={Link}
          to={'/calendar/' + addMonths(month, 1)}
        >
          <Icon>chevron_right</Icon>
        </IconButton>
      </Box>
      <Box flex='1' marginLeft='16px' component='h3'>
        {formatMonth(month)}
      </Box>
      <UserMenu />
    </Box>
  );
});
