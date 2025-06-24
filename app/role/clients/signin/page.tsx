import ClientsSignIn from "@/components/ClientsSignIn";

export default function Welcome () {
    return <div className="relative">
        <ClientsSignIn image={"/welcome-client.png"} role={"client"}/>
    </div>
}