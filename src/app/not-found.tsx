import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'
import { FaArrowRightLong } from 'react-icons/fa6'
import { TbError404 } from 'react-icons/tb'

export default function NotFound() {
	return (
		<div className="mt-24 h-full flex flex-col items-center justify-center text-minimal text-xl">
			<TbError404 size={100} />

			<h1 data-testid="not-found-title" className="font-bold">
				Página ou recurso não encontrado
			</h1>
			<p>Não foi possível encontrar o recurso solicitado</p>

			<Link
				data-testid="home-page-button"
				href="/"
				className="mt-4 flex items-center gap-3"
			>
				<Button
					variant="default"
					className="mt-0 flex items-center gap-3 bg-green"
				>
					Ir para a página inicial
					<FaArrowRightLong />
				</Button>
			</Link>
		</div>
	)
}
