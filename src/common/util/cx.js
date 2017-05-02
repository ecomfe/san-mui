/**
 * @file cx
 * @author leon <ludafa@outlook.com>
 */

import cx from 'classnames/dedupe';
import {COMPONENT_CLASSNAME_PREFIX} from '../../constants';

function addPrefix(prefix) {

    return function (...args) {

        let classNames = cx(...args).trim();

        return classNames
            ? classNames
                .split(' ')
                .map(function (className) {
                    return `${prefix}-${className}`;
                })
                .join(' ')
            : '';

    };

}

function resolveStates(component) {
    let disabled = component.data.get('disabled');
    let readOnly = component.data.get('readOnly');
    let hidden = component.data.get('hidden');
    return {
        disabled,
        readOnly,
        hidden
    };
}

function convertToVariants(variants) {

    if (!variants) {
        return [];
    }

    if (typeof variants === 'string') {
        return variants
            .split(' ')
            .filter(variant => !!variant)
            .map(variant => variant.trim());
    }

    return Array.isArray(variants) ? variants : [];

}

export function create(prefix) {

    function getPartClassName(part) {
        return part
            ? `${COMPONENT_CLASSNAME_PREFIX}-${prefix}-${part}`
            : `${COMPONENT_CLASSNAME_PREFIX}-${prefix}`;
    }

    function classNameBuilder(component) {

        let part = '';
        let variants = convertToVariants(component.data.get('variants'));

        let states = resolveStates(component);
        let originClassName = component.data.get('class');
        let getVariantClassName = addPrefix('variant');
        let getStateClassName = addPrefix('state');

        let builder = {
            build,
            setPart,
            addVariants,
            addStates
        };

        function setPart(p) {
            part = p;
            return builder;
        }

        function addVariants(...extraVariants) {
            variants = [
                ...variants,
                ...extraVariants.map(convertToVariants)
            ];
            return builder;
        }

        function addStates(...extraStates) {
            states = extraStates.reduce(
                (states, state) => {
                    return {
                        ...states,
                        ...state
                    };

                },
                states
            );
            return builder;
        }

        function build() {
            return cx(
                originClassName,
                getPartClassName(part),
                getVariantClassName(variants),
                getStateClassName(states)
            );
        }

        return builder;

    }

    classNameBuilder.getPartClassName = getPartClassName;

    return classNameBuilder;

}
