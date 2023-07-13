import Teachers from "../components/Teachers";

export default function Home() {
    return (
        <Teachers />
    );
}

export async function loader(){
    const response = await fetch('http://localhost:5000/users');
    if(!response.ok){
    return null
    }
    else{
        const resData = await response.json();
        return resData.users;
    }
}
