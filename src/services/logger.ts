type Level = 'log' | 'info' | 'warn' | 'error'

const createLogger = (level: Level) => {
	return (message: string) => {
		const now = new Date()
		const formattedMessage = `${now.toISOString()} [${level.toUpperCase()}]: ${message}`
		console[level](formattedMessage)
	}
}

class LoggerService {
	log = createLogger('log')
	info = createLogger('info')
	warn = createLogger('warn')
	error = createLogger('error')
}

export const logger = new LoggerService()
