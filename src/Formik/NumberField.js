import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {FastField, Field} from 'formik';

/**
 * A component that wraps Material UI TextField with Formik form context and only accepts number inputs. Decimal places can be set via the "decimal" prop. Commonly used TextField props are described below in the PROPS & METHODS section.
 * Less common props can also be passed; see <a href='https://material-ui.com/api/text-field/' target="_blank">TextField API</a> for details.
 *
 * @version 1.0.0
 * @author [Gerry Blackmon](https://github.com/gblackiv)
 * @author [Daniel Kinsbursky](https://github.com/kbi-daniel)
 * @author [Chris Voss](https://github.com/ChrisJVoss)
 * @param {object} props Properties passed down from parent component.
 * @return {JSX} A react JSX component.
 * @public
 *
 */
const NumberField = (props) => {
  const {
    color,
    decimal,
    disabled,
    error,
    fast,
    fullWidth,
    helperText,
    id,
    label,
    margin,
    multiline,
    name,
    onBlur,
    onChange,
    placeholder,
    required,
    rows,
    rowsMax,
    size,
    variant,
    ...otherProps
  } = props;
  const setNumberValue = useCallback((field, form) => {
    const value = parseFloat(field.value).toFixed(decimal);
    if (!isNaN(value)) form.setFieldValue(field.name, value);
    else form.setFieldValue(field.name, '');
  }, [decimal]);
  const textFieldProps = useCallback(formik => {
    const {field, form, meta} = formik;
    return {
      ...field,
      color,
      disabled: disabled || form.isSubmitting,
      error: error || (meta.touched && meta.error) ? true : false,
      fullWidth,
      helperText: (() => {
        if (meta.touched && meta.error) return meta.error;
        else if (helperText) return helperText;
        else return '';
      })(),
      id: id || name,
      InputProps: {endAdornment: <InputAdornment position="end">No.</InputAdornment>},
      label: label || name,
      margin,
      multiline,
      placeholder,
      required,
      rows,
      rowsMax,
      size,
      variant,
      onBlur: event => {
        field.onBlur(event);
        setNumberValue(field, form);
        if (onBlur) onBlur({event, field, form, meta});
      },
      onChange: event => {
        field.onChange(event);
        if (onChange) onChange({event, field, form, meta});
      },
      onKeyDown: e => {
        if (e.keyCode >= 48 && e.keyCode <= 57) e.persist();
        else if (e.keyCode >= 96 && e.keyCode <= 105) e.persist();
        else if (e.keyCode === 8) e.persist();
        else if (e.keyCode === 9) e.persist();
        else if (e.keyCode === 13) e.persist();
        else if (e.keyCode === 46) e.persist();
        else if (e.keyCode === 190) {
          if (field.value.split('.').length > 1) e.preventDefault();
          else e.persist();
        } else e.preventDefault();
      },
    };
  }, [color, disabled, error, fullWidth, helperText, id, label, margin, multiline, name, onBlur, onChange, placeholder, required, rows, rowsMax, size, variant, setNumberValue]);

  if (fast) {
    return <FastField name={name}>
      {formik => <MuiTextField {...textFieldProps(formik)} {...otherProps} />}
    </FastField>;
  }
  return <Field name={name}>
    {formik => <MuiTextField {...textFieldProps(formik)} {...otherProps} />}
  </Field>;
};

NumberField.defaultProps = {
  color: 'primary',
  decimal: 0,
  disabled: false,
  error: false,
  fast: false,
  fullWidth: true,
  margin: 'dense',
  multiline: false,
  required: false,
  variant: 'standard',
};
NumberField.propTypes = {
  /** The color of the component. It supports those theme colors that make sense for this component. */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /** Number indicating how many decimal places to display. */
  decimal: PropTypes.number.isRequired,
  /** If `true`, the `input` element will be disabled. */
  disabled: PropTypes.bool,
  /** If `true`, the label will be displayed in an error state. */
  error: PropTypes.bool,
  /** If `true` component uses `<FastField />` as an optimized version of `<Field />`. Should only be used on large forms (~30+ fields) or when a field has very expensive validation requirements. `<FastField />` has the same exact API as `<Field>`, but implements `shouldComponentUpdate()` internally to block all additional re-renders unless there are direct updates to the `<FastField />'s` relevant parts/slice of Formik state. */ //eslint-disable-line
  fast: PropTypes.bool,
  /** If `true`, the input will take up the full width of its container. */
  fullWidth: PropTypes.bool,
  /** The helper text content. ***Note:*** Formik error messages take priority over hardcoded helper text content. */
  helperText: PropTypes.node,
  /** The `id` of the input element. Use this prop to make label and helperText accessible for screen readers. If not set, `id` will default to `name` prop. */
  id: PropTypes.string,
  /** The `label` content. If not set, `label` will default to `name` prop.  */
  label: PropTypes.string,
  /** If `dense` or `normal`, will adjust vertical spacing of this and contained components. */
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  /** if true, a `textarea` element will be rendered instead of an input. */
  multiline: PropTypes.bool,
  /** A field's name in Formik state. Also, automatically sets the input's `id` attribute if not otherwise passed. */
  name: PropTypes.string.isRequired,
  /** Callback fired when the `input` loses focus. ***Signature:*** `({event, field, handlers, meta}) => {}`; */
  onBlur: PropTypes.func,
  /** Callback fired when the input's `value` is changed. ***Signature:*** `({event, field, handlers, meta}) => {}`; */
  onChange: PropTypes.func,
  /** The short hint displayed in the input before the user enters a value. */
  placeholder: PropTypes.string,
  /** If `true`, the label is displayed as required and the input element will be required. */
  required: PropTypes.bool,
  /** Number of rows to display when multiline option is set to true. */
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Maximum number of rows to display when multiline option is set to true. */
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** The size of the text field. */
  size: PropTypes.oneOf(['small', 'medium']),
  /** The variant to use. */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};
export default NumberField;
