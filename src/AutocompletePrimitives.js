import glamorous from 'glamorous';

export const $Root = glamorous.div({
  border: '1px solid #ccc',
  width: '300px',
  margin: '0 auto',
});

export const $TextInput = glamorous.input({
  border: 'none',
  padding: '8px 10px',
  boxSizing: 'border-box',
  width: '100%',
});

export const $Results =  'div';

export const $Result = glamorous.div({
  borderTop: '1px solid #ccc',
  padding: '8px 10px',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'AliceBlue'
  }
});
