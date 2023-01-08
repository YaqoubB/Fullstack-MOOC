

const Persons = ({ persons, handleDeleteNumber }) => {
    
 return (
      <>
        <div>
          {persons.map(person => <div key={person.name}> {person.name} {person.number} {<input id={person.name} type="button" value="delete" onClick={handleDeleteNumber} />} </div>)}
        </div>
      </>
  )
}

export default Persons 