import moment from 'moment'

export const formatCash = str => {
    return (
        str
            .toString()
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (
                    (index % 3 ? next : next + '.') + prev
                )
            }) + 'đ'
    )
}

export const discount = (price, percent) => {
    parseInt(price, percent)
    const result = price * (percent / 100)
    return (price - result).toString()
}

export const specification = (type, data) => {
    switch (type) {
        case 'phone':
            return (
                <ul>
                    <li>
                        <span>Màn hình:</span>
                        <p>{data.screen}</p>
                    </li>
                    <li>
                        <span>Hệ điều hành:</span>
                        <p>{data.OS}</p>
                    </li>
                    <li>
                        <span>Camera sau:</span>
                        <p>{data.backCamera}</p>
                    </li>
                    <li>
                        <span>Camera trước:</span>
                        <p>{data.frontCamera}</p>
                    </li>
                    <li>
                        <span>Chip:</span>
                        <p>{data.chip}</p>
                    </li>
                    <li>
                        <span>RAM:</span>
                        <p>{data.RAM}</p>
                    </li>
                    <li>
                        <span>Bộ nhớ trong:</span>
                        <p>{data.ROM}</p>
                    </li>
                    <li>
                        <span>SIM:</span>
                        <p>{data.sim}</p>
                    </li>
                    <li>
                        <span>Pin, Sạc:</span>
                        <p>{data.battery}</p>
                    </li>
                </ul>
            )
        default:
            break
    }
}

export const timer = time => {
    const pegs = new Date(time)
    const end =
        (pegs.getDate() < 10
            ? '0' + pegs.getDate()
            : pegs.getDate()) +
        '-' +
        (pegs.getMonth() + 1 < 10
            ? '0' + (pegs.getMonth() + 1)
            : pegs.getMonth + 1) +
        '-' +
        pegs.getFullYear()
    const date = moment(time)
    const now = moment(new Date())

    const hours = now.diff(date, 'hours')
    const minutes = now.diff(date, 'minutes')

    if (minutes < 60) {
        return minutes + ' Phút trước'
    } else {
        if (hours < 24) {
            return hours + ' Giờ trước'
        } else {
            return end
        }
    }
}
