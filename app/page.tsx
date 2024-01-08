import CubeExperiment from '@/components/CubeExperiment'

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-24 bg-slate-300/20'>
            <div className='z-10 max-w-5xl w-full text-center font-mono text-sm lg:flex lg:flex-col lg:items-center lg:justify-between'>
                <h1 className='text-3xl font-bold mb-2'>Play with threejs</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
                    <CubeExperiment />
                </div>
            </div>
        </main>
    )
}
