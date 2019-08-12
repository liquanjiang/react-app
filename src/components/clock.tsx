import React, {Component} from 'react'
import './clock.css'

export default class Clock extends Component {

    public state: any
    public timer: any
    constructor(props: Readonly<{}>) {
        super(props)
        this.state = {date: new Date()}
    }

    public componentDidMount(): void {
        this.timer = setInterval(() => {
            this.tick()
        }, 1000)
    }

    public componentWillUnmount(): void {
        clearInterval(this.timer)
    }

    public tick(): void {
        this.setState({
            date: new Date(),
        })
    }

    public render() {
        return (
            <div className={'clocked'}>
                {this.state.date.toLocaleTimeString()}
            </div>
        )
    }
}
