import { makeStyles } from '@material-ui/core';
import { Box, Button, TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { classicNameResolver } from 'typescript';
import { signInEndpoint, IUser } from './backend';

// value={event.date}
//onChange={evt => setEvent({ ...event, date: evt.target.value })}
//error={!!errors.date}
//helperText={errors.date}

const useStyles = makeStyles({
  error: {
    backgroundColor: 'rgb(253,236,234)',
    borderRadius: '4px',
    padding: '16px',
    margin: '16px 0',
  },
});

interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}

export function LoginScreen(props: ILoginScreenProps) {
  const classes = useStyles();

  const [email, setEmail] = useState('danilo@email.com');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    signInEndpoint(email, password).then(props.onSignIn, e =>
      setError('E-mail não encontrado ou senha incorreta')
    );
    // if (event) {
    //   if (validate()) {
    //     if (isNew) {
    //       createEventEndpoint(event).then(props.onSave);
    //     } else {
    //       updateEventEndpoint(event).then(props.onSave);
    //     }
    //   }
    // }
  }

  return (
    <Container maxWidth='sm'>
      <h1>Agenda React</h1>
      <p>
        Digite email <kbd>danilo@email.com</kbd> e senha <kbd>1234</kbd>
      </p>

      <form onSubmit={signIn}>
        <TextField
          margin='normal'
          label='E-mail'
          fullWidth
          variant='outlined'
          onChange={evt => setEmail(evt.target.value)}
        />
        <TextField
          type='password'
          margin='normal'
          label='Senha'
          fullWidth
          variant='outlined'
          onChange={evt => setPassword(evt.target.value)}
        />
        {error && <div className={classes.error}>{error}</div>}
        <Box textAlign='right' marginTop='16px'>
          <Button type='submit' variant='contained' color='primary'>
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}
