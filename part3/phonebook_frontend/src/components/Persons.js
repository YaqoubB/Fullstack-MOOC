

const Persons = ({ persons, handleDeleteNumber }) => {
    
 return (
      <>
        <div>
          {persons.map(person => <div key={person.id}> {person.name} {person.number} {<input id={person.id} type="button" value="delete" onClick={handleDeleteNumber} />} </div>)}
        </div>
      </>
  )
}

export default Persons 