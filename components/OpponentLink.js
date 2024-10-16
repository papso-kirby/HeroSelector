import Spacer from '@components/Spacer';

export default function OpponentLink({ link }) {
    return (<>
        <h3>Your opponent</h3>
        <span>Send this <a target='blank' href={link}>link</a> to your opponent and wait for them to select their heroes.</span>
        <Spacer />
        <button className='clickable work-sans-A' type='button' onClick={() => navigator.clipboard.writeText(link)}>COPY LINK</button>
    </>)
}
