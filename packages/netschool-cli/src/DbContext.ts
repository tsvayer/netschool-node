import mongoose from 'mongoose'
import { AssignmentModel, Model } from './models'
import { AssignmentSchema } from './schema'

export class DbContext {
  private connection: mongoose.Connection

  constructor(url: string) {
    this.connection = mongoose.createConnection(url, {
      useNewUrlParser: true
    })
  }

  get Model(): Model {
    return {
      Assignment: this.connection.model<AssignmentModel>(
        'Assignment',
        AssignmentSchema
      )
    }
  }

  async close() {
    await this.connection.close()
  }
}
