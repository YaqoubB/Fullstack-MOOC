

const PersonForm = (props) => {
    const { newName, newNumber, addName, handleChangeName, handleChangeNumber } = props

    return (
        <>
        <form onSubmit={addName} >
            <div>
            name: <input value={newName} onChange={handleChangeName} />
            </div>
            <div>
            number: <input value={newNumber} onChange={handleChangeNumber}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default PersonForm