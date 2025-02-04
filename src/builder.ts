import { defineComponent, h } from "vue";

export default defineComponent({
  name: "DocusealBuilder",
  props: {
    token: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: false,
      default: "cdn.docuseal.co",
    },
    language: {
      type: String,
      required: false,
      default: "en",
    },
    preview: {
      type: Boolean,
      required: false,
      default: false,
    },
    autosave: {
      type: Boolean,
      required: false,
      default: true,
    },
    fields: {
      type: Array,
      required: false,
      default: () => [],
    },
    roles: {
      type: Array,
      required: false,
      default: () => [],
    },
    fieldTypes: {
      type: Array,
      required: false,
      default: () => [],
    },
    withRecipientsButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    withTitle: {
      type: Boolean,
      required: false,
      default: true,
    },
    withSendButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    onlyDefinedFields: {
      type: Boolean,
      required: false,
      default: false,
    },
    withUploadButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    withSignYourselfButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    withDocumentsList: {
      type: Boolean,
      required: false,
      default: true,
    },
    withFieldsList: {
      type: Boolean,
      required: false,
      default: true,
    },
    customButton: {
      type: Object,
      required: false,
      default: () => ({ title: "", url: "" }),
    },
    sendButtonText: {
      type: String,
      required: false,
      default: "",
    },
    saveButtonText: {
      type: String,
      required: false,
      default: "",
    },
    backgroundColor: {
      type: String,
      required: false,
      default: "",
    },
    customCss: {
      type: String,
      required: false,
      default: "",
    },
  },
  emits: ["load", "upload", "send", "init"],
  mounted() {
    const scriptId = "docuseal-builder-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");

      script.id = scriptId;
      script.async = true;
      script.src = `https://${this.host}/js/builder.js`;

      document.head.appendChild(script);
    }

    this.$el.addEventListener("load", (e: CustomEvent) =>
      this.$emit("load", e.detail),
    );

    this.$el.addEventListener("upload", (e: CustomEvent) =>
      this.$emit("upload", e.detail),
    );

    this.$el.addEventListener("send", (e: CustomEvent) =>
      this.$emit("send", e.detail),
    );

    this.$el.addEventListener("init", () => this.$emit("init"));
  },
  render() {
    return h("docuseal-builder", {
      "data-token": this.token,
      "data-preview": this.preview,
      "data-language": this.language,
      "data-autosave": this.autosave,
      "data-send-button-text": this.sendButtonText,
      "data-save-button-text": this.saveButtonText,
      "data-roles": this.roles.join(","),
      "data-field-types": this.fieldTypes.join(","),
      "data-fields": JSON.stringify(this.fields),
      "data-background-color": this.backgroundColor,
      "data-custom-button-title": this.customButton.title,
      "data-custom-button-url": this.customButton.url,
      "data-with-recipients-button": this.withRecipientsButton,
      "data-with-send-button": this.withSendButton,
      "data-with-title": this.withTitle,
      "data-only-defined-fields": this.onlyDefinedFields,
      "data-with-upload-button": this.withUploadButton,
      "data-with-documents-list": this.withDocumentsList,
      "data-with-fields-list": this.withFieldsList,
      "data-with-sign-yourself-button": this.withSignYourselfButton,
      "data-custom-css": this.customCss,
    });
  },
});
