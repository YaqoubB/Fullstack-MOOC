

const Notification = ({ message }) => {
    const notificationStyle = {
        color: (message[1]) ? "green" : "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

if (message[0] === null) {
    return null
}

return (
    <div style={notificationStyle} >
        {message[0]}
    </div>
)
}

export default Notification