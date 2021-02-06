import styled from 'styled-components';

const SearchBox = styled.input`
  display: inline-flex;
  width: ${props => (props.width ? props.width : '600px')};
  height: 42px;
  margin-right: 1rem;
  border-radius: 21px;
  background-color: #eceff1;
  border: 1px solid transparent;
  font-size: 0.875rem;
  color: #253238;
  padding: 0 32px 0 44px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  outline: none;
`;

export default SearchBox;
