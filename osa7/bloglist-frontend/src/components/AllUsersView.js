import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  color: #BF4F74;
  font-weight: bold;
`
const Wrapper = styled.section`
  margin: 2em;
  padding: 4em;
  background: #C7EBDF;
  border: 2px solid #005A3D;
  border-radius: 3px
`
const ItemWrapper = styled.section`
  padding: 2em;
  background: white;
  border: 0.5px solid #005A3D;
`
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
`

const TableHeader = styled.th`
  background-color: #e0f2df;
  padding: 8px;
  text-align: left;
`

const TableData = styled.td`
  padding: 8px;
  border-top: 1px solid #ddd;
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #e0f2df;
  }
`


const AllUsersView = ({ blogs }) => {


  if(Object.keys(blogs).length !== 0) {return (
    <div>
      <Wrapper>
        <h1>Users:</h1>
        <ItemWrapper>
          <StyledTable>

            <thead>
              <TableRow>


                <TableHeader>User</TableHeader>


                <TableHeader>Blogs created</TableHeader>



              </TableRow>
            </thead>


            <tbody>
              {Object.keys(blogs).map(user => (
                <TableRow key={user}>

                  <TableData>
                    <StyledLink to={`/user/${user}`}>{user}</StyledLink>
                  </TableData>
                  <TableData>{blogs[user].length}</TableData>

                </TableRow>
              ))}
            </tbody>

          </StyledTable>
        </ItemWrapper>
        <StyledLink to='/'>Back to front page</StyledLink>
      </Wrapper>
    </div>
  )}
  else{
    return null
  }
}

export default AllUsersView