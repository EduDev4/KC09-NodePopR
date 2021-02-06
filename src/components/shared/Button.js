import styled from 'styled-components';

const accentColor = 'rgb(19,  193, 172)';

const Button = styled.button`
  justify-content: center;
  font-size: 0.875rem;
  border-radius: 20px;
  margin-left: 8px;
  margin-right: 12px;
  padding: 0 20px;
  height: ${props => (props.navigation ? '21px' : '42px')};
  background-color: #fff;
  border: 1px solid #13c1ac;
  color: #13c1ac;
  cursor: pointer;
  align-items: center;
  background-color: ${props =>
    props.variant === 'primary' ? accentColor : 'white'};
  border-color: ${accentColor};
  color: ${props => (props.variant === 'primary' ? 'white' : accentColor)};
  display: inline-flex;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  text-decoration: none;
  transition: background-color 0.2s;
  font-weight: bold;
  &:hover {
    background-color: ${props =>
      props.variant === 'primary'
        ? 'rgb(2,  173, 152)'
        : 'rgba(19,  193, 172, 0.2)'};
  }
`;

export default Button;
