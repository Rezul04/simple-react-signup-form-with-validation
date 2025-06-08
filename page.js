import RegistrationForm from "@/components/registration-form"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Registration Form</h1>
      <div className="max-w-2xl mx-auto">
        <RegistrationForm />
      </div>
    </div>
  )
}
