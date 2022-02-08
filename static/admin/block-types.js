/**
 * @typedef {Object} NetlifyWidget
 * @property {string} label - A human-readable name
 * @property {string} name - the tag of the component being used
 * @property {String} widget - The widget being used by the CMS.
 * @property {String?} [summary] - The summary of the widget when collapsed
 * @property {String?} [default] - the default value
 * @property {Boolean?} [required=true] - whether the field is required
 * @property {String?} [hint=''] - an optional hint to help users
 * @property {NetlifyWidget?} [field]
 * @property {NetlifyWidget[]?} [fields] - The fields the widget has.
 * @property {String[]?} [pattern] - a list of patterns that can be used to validate inputs
 */

/**
 * @param {Object} options
 * @param {string} options.label - Label visible to user
 * @param {string} options.name - vue component tag name
 * @param {string} options.summary - Label used when section is collapsed. see the netlify-cms docs for more details.
 * @param {NetlifyWidget[]?} [options.requiredFields] - props/attributes that are REQUIRED for your block to work
 * @param {NetlifyWidget[]?} [options.optionalFields] - props/attributes that are optional for your block. includes some defaults like class and style.
 * @param {NetlifyWidget[]?} [options.children] - other CMS blocks that can be placed in the default slot.
 * @returns NetlifyWidget
 */
export function NetlifyCmsBlock({label, name, summary, requiredFields = null, optionalFields = null, children = null}) {


  const NewBlock = {
    label,
    name,
    widget: 'object',
    summary,
    fields: [
      {label: 'Type', name: 'type', widget: 'hidden', default: name},
    ],
  }

  if (requiredFields && Array.isArray(requiredFields)) {
    NewBlock.fields.push({
      label: "Attributes",
      name: "requiredFields",
      widget: 'object',
      collapsed: false,
      fields: requiredFields,
    })
  }

  if (children && Array.isArray(children)) {
    NewBlock.fields.push({
      label: "Contents",
      name: "children",
      widget: 'list',
      types: children,
    })
  }

  if (optionalFields && Array.isArray(optionalFields)) {
    optionalFields.forEach((e) => e.required = false)
  }

  NewBlock.fields.push({
    label: 'Options',
    name: 'optionalFields',
    widget: 'object',
    collapsed: true,
    fields: [
      {label: "Style", name: "style", summary: "Add an inline style.", type: 'string', required: false},
      {
        label: "Classes",
        name: "class",
        summary: "Add extra classes to this component.",
        type: "string",
        required: false,
      },
      ...(Array.isArray(optionalFields) ? optionalFields : []),
    ],
  })

  NewBlock.fields.push({label: 'UUID', name: 'uuid', widget: 'uuid'})

  return NewBlock
}


export const MarkDown = NetlifyCmsBlock({
  label: "Rich Text",
  name: 'cms-block-markdown',
  summary: "{{fields.requiredFields.content}}",
  requiredFields: [
    {label: "Content", name: 'content', widget: 'markdown'},
  ],
})

export default [MarkDown]
