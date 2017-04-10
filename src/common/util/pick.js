/**
 * @file pick
 * @author leon <ludafa@outlook.com>
 */

export default function pick(data, props) {
    return props.reduce(
        (result, prop) => {
            result[prop] = data.get(prop);
            return result;
        },
        {}
    );
}
