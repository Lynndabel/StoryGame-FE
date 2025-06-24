import WelcomePage from "@/components/WelcomePage";

export default function Welcome () {
    return <div className="relative">
        <WelcomePage image={"/welcome-artisan.png"} role={"artisan"}/>
    </div>
}