<script>

  import moment from 'moment'
  import config from '~plugins/config'

  import CButton from '~components/util/Button'
  import Modal from '~components/util/Modal'

  export default {
    name: 'PersonSubHeader',

    components: { CButton, Modal },

    props: {
      person: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        defaultContact: config.contact,
        showDescriptionModal: false,
        showContactModal: false
      }
    },

    computed: {
      hasOrganizationEmails () {
        return this.person.organization &&
          this.person.organization.emails &&
          this.person.organization.emails.length
      },

      hasOrganizationPhones () {
        return this.person.organization &&
          this.person.organization.phones &&
          this.person.organization.phones.length
      }
    },

    methods: {
      toggleDescriptionModal () {
        this.showDescriptionModal = !this.showDescriptionModal
      },

      toggleContactModal () {
        this.showContactModal = !this.showContactModal
      },

      sharePerson (source) {
        const url = `https://find.earth/person/${this.person.slug}`

        const gender = this.person.gender === 'M' ? 'o' : 'a'
        const date = moment(this.person.createdAt).format('DD/MM/YYYY')
        const text = `${this.person.name} se perdió el ${date}, en ` +
                     `${this.person.geo.city} ayúdanos a encontrarl${gender}: ${url}`

        const sources = {
          twitter: `${config.social.twUrl}?text=${text}`,
          facebook: `${config.social.fbUrl}?u=${url}`,
          whatsapp: `${config.social.wpUrl}${encodeURI(text)}`
        }

        window.open(sources[source])
      }
    }
  }
</script>

<template lang="pug">
  .person-sub-header

    .left
      h1.person-name.animated.fadeIn(v-if="person.name") {{ person.name }}&nbsp;
        | ({{`${person.age} ${$t('person.years')}`}})

    .right

      span.social-icons.animated.fadeIn(v-if="person.name")
        i.fa.fa-facebook(@click="sharePerson('facebook')")
        i.fa.fa-twitter(@click="sharePerson('twitter')")
        i.fa.fa-whatsapp(@click="sharePerson('whatsapp')")

      c-button.action-button.first.animated.fadeIn(
        v-if="person.name",
        :name="$t('person.subheader.contact')",
        @click="toggleContactModal"
      )

      c-button.action-button.second.animated.fadeIn(
        v-if="person.description && Object.keys(person.description).length",
        :name="$t('person.subheader.moreInfo')",
        @click="toggleDescriptionModal"
      )

    modal(v-show="showDescriptionModal", @close="toggleDescriptionModal")
      h3(slot="header")
        span.description-title {{ person.name }}
        |  ({{ person.age }} {{ $t('person.years') }})
      div(slot="body")
        p(v-if="person.description && person.description.appearance")
          b.description-title {{ $t('person.descriptionModal.appearance') }} &nbsp;
          | {{ this.person.description.appearance }}
        p(v-if="person.description && person.description.clothing")
          b.description-title {{ $t('person.descriptionModal.clothing') }} &nbsp;
          | {{ this.person.description.clothing }}
        p(v-if="person.description && person.description.more")
          b.description-title {{ $t('person.descriptionModal.moreInfo') }} &nbsp;
          | {{ this.person.description.more }}

    modal(v-show="showContactModal", @close="toggleContactModal")
      h3(slot="header")
        span(v-html="$t('person.contactModal.title', { personName: person.name })")
      div(slot="body")
        p(v-if="hasOrganizationEmails || defaultContact.email")
          b.description-title Email:&nbsp;
          a.contact-link(v-if="hasOrganizationEmails", v-for="e in person.organization.emails", :href="`mailto:${e}`")
            | {{ e }}&nbsp;
          a.contact-link(v-else, :href="`mailto:${defaultContact.email}`")
            | {{ defaultContact.email }}
        p(v-if="hasOrganizationPhones || defaultContact.phone")
          b.description-title {{ $t('person.contactModal.phone') }} &nbsp;
          a.contact-link(v-if="hasOrganizationPhones", v-for="p in person.organization.phones", :href="`tel:${p}`")
            | {{ p }}&nbsp;
          a.contact-link(v-else, :href="`mailto:${defaultContact.phone}`")
            | {{ defaultContact.phone }}
        p(v-if="defaultContact.emergencyPhone")
          b.description-title {{ $t('person.contactModal.emergencyPhone') }} &nbsp;
          a.contact-link(:href="`tel:${defaultContact.emergencyPhone}`")
            | {{ defaultContact.emergencyPhone }}
</template>

<style lang="scss" scoped>
  .person-sub-header {
    display: flex;
    align-items: center;
    background: #f4f7fa;
    color: #fff;
    padding: 0 3em;
    border-bottom: 1px solid #DAE1E9;
    justify-content: space-between;

    @media (max-width: 750px) {
      flex-direction: column;
      padding-bottom: 25px;
    }

    .left {
      .person-name {
        color: #29235C;
        font-size: 1.5em;
        font-weight: 500;

        @media (max-width: 750px) {
          text-align: center;
        }
      }
    }

    .right {
      display: flex;
      align-content: center;
      align-items: center;

      @media (max-width: 750px) {
        width: 100%;
        justify-content: space-between;
      }

      @media (max-width: 500px) {
        flex-direction: column;
        align-items: center;
      }

      .social-icons {
        margin-left: 20px;
        color: #29235C;

        @media (max-width: 750px) {
          margin: 0;
          order: 2;
        }

        @media (max-width: 500px) {
          order: 0;
          margin-bottom: 10px;
        }

        i {
          width: 30px;
          font-size: 1.2em;
          line-height: 2;
          text-align: center;
          &:hover {
            cursor: pointer;
          }
          transition: color 0.3s;
        }
        .fa-facebook {
          &:hover {
            color: #3b5998;
          }
        }
        .fa-twitter {
          &:hover {
            color: #1dcaff;
          }
        }
        .fa-whatsapp {
          &:hover {
            color: #25d366;
          }
        }
      }

      .action-button {
        margin-left: 20px;
        order: 3;

        @media (max-width: 750px) {
          margin: 0;
        }

        &.first {
          order: 1;

          @media (max-width: 500px) {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
</style>
