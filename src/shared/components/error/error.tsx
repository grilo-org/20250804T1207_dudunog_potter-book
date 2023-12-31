import {
	Alert,
	AlertDescription,
	AlertTitle,
} from '@/shared/components/ui/alert'

type ErrorProps = {
	title: string
	error: string
}

const Error = ({ title, error }: ErrorProps) => {
	return (
		<Alert
			data-testid="error"
			variant="default"
			className="mt-4 text-destructive"
		>
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription>{error}</AlertDescription>
		</Alert>
	)
}

export { Error }
