import debug from 'debug';
import http from 'http';
import app from '../app';

class Server {
  public server: any
  public port: number | string
  constructor() {
    this.port = this.normalizePort(process.env.PORT || '8000')
    this.server = http.createServer(app.callback())
    this.server.listen(this.port)
    this.server.on('error', this.onError)
    this.server.on('listening', this.onListening)
  }

  private normalizePort = (val: any): any => {
    let port = parseInt(val, 10)
    if (isNaN(port)) {
      return val
    }
    if (port >= 0) {
      return port
    }
    return false
  }

  private onError = (error: any): void => {
    if (error.syscall !== 'listen') {
      throw error
    }
    
    let bind = typeof this.port === 'string' ? 'Pipe ' + this.port : 'Port ' + 
       this.port
  
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
  
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
  
      default:
        throw error
    }
  }

  public onListening = (): void => {
    let addr = this.server.address();

    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + 
    addr.port;

    console.info('server is running at:', bind);
    debug('Listening on ' + bind);
  }
}

new Server()