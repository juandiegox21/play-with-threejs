import dynamic from 'next/dynamic'

// Dynamically import the CapybaraExperiment component with SSR disabled
const CapybaraExperiment = dynamic(() => import('../components/CapybaraExperiment'), {
    ssr: false,
})

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-center overflow-hidden'>
            <CapybaraExperiment />
        </main>
    )
}
