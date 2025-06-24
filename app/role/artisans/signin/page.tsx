import ArtisansSignIn from "@/components/ArtisansSignIn";

export default function Welcome () {
    return <div className="relative">
        <ArtisansSignIn image={"/welcome-artisan.png"} role={"artisan"}/>
    </div>
}