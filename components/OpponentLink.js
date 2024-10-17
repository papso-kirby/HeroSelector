export default function OpponentLink({ link }) {
    return (<div className='flex-column box'>
        <h3>Your opponent</h3>
        <span>Send this <a target='blank' href={link}>link</a> to your opponent and wait for them to select their heroes.</span>
        <button className='clickable work-sans-A margin-1' type='button' onClick={() => navigator.clipboard.writeText(link)}>COPY LINK</button>
    </div>)
}
