<template>
  <headerVue />
  <div class="space-from-header"></div>

  <div class=" animate__animated animate__fadeIn">

    <div class="section-panel min-vh-100 pt-5 pb-0">
      <div class="container mb-5">
        <div class="row g-3 justify-content-center ">
          <!-- <div class="col-12 text-center text-lg-start">
            <div class="section-title">Contact</div>
            <small>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </small>
          </div> -->

          <div class="col-lg-12 text-center">
            <div class="min-vh- bg-light my-3">
              <div>
                <div class="mapswrapper"><iframe width="600" height="450" loading="lazy" allowfullscreen
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=2nd%20Floor%2C%201%20Adeola%20Adeoye%20Street%2C%20Toyin%20Street%2C%20Ikeja%2C%20Lagos%2C%20Nigeria.&zoom=10&maptype=roadmap"></iframe><a
                    href="https://www.fluxpromptgenerator.net">Prompt Generator</a>


                </div>
                <!-- <GoogleMap api-key="GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="map_center"
                  :zoom="15">
                  <Marker :options="{ position: map_center }" />
                </GoogleMap> -->
              </div>
            </div>
          </div>
          <div class="col-12 text-center">
            <h4 class="">Contact us</h4>
            <div class="text-muted small">
              We are ecstatic at the prospect of receiving you at our physical addressess or you can send us a message.
            </div>
          </div>
          <div class="col-12">
            <div class="fw-bold my-3">Get in touch</div>
          </div>

          <div class="col-lg-6">
            <form @submit.prevent="sendMessage" class="row justify-content-center g-3">
              <div class="col-md-6">
                <div class="fw-bol form-label">First Name </div>
                <input v-model="form.firstname" type="text" class="form-control shadow-sm ">
              </div>
              <div class="col-md-6">
                <div class="fw-bol form-label">Last Name</div>
                <input v-model="form.lastname" type="text" class="form-control shadow-sm ">
              </div>
              <div class="col-md-12">
                <div class="fw-bol form-label">Email Address
                  <span class="text-danger small">*</span>
                </div>
                <input v-model="form.email" type="email" class="form-control shadow-sm ">
              </div>
              <div class="col-md-12">
                <div class="fw-bol form-label">Message
                  <span class="text-danger small">*</span>
                </div>
                <textarea v-model="form.message" @input="checkWordCount" class="form-control shadow-sm "
                  style="height: 100px;"></textarea>
                <span class="small">{{ form.maxCharCount - form.message.length }} characters remaining</span>
              </div>
              <div class="col-md-12 mt-3">
                <primaryButton btnType="submit" v-if="!form.isSending" className="float-end">
                  Get in touch
                </primaryButton>
                <primaryButtonLoading v-else btnText="Sending" className="float-end" />

              </div>
            </form>
          </div>


          <div class="col-lg-6">
            <section v-for="(country, index) in locations" :key="index" class="mb-4">
              <div class="fw-bold">{{ country.name }}</div>
              <ul class="list-group list-group-flush">
                <li v-for="(info, infoIndex) in country.details" :key="infoIndex"
                  class="list-group-item border-0 small ps-0 pb-0">
                  <i :class="info.icon + ' text-danger-emphasis me-2'"></i>
                  <span v-if="info.type === 'text'">{{ info.value }}</span>
                  <a v-if="info.type === 'link'" :href="info.href" class="theme-color">
                    {{ info.value }}
                  </a>
                </li>
              </ul>
            </section>

          </div>
        </div>

      </div>

    </div>

  </div>

  <!-- footer -->
  <footerVue />
</template>

<script setup lang="ts">
import headerVue from '@/components/templates/header.vue'
import footerVue from '@/components/templates/footer.vue'
import api from '@/stores/Helpers/axios'
import { reactive } from 'vue';
import useFunctions from '@/stores/Helpers/useFunctions';
// import { GoogleMap, Marker } from "vue3-google-map";

// const map_center = { lat: 40.689247, lng: -74.044502 };



// contact_us form
const form = reactive({
  email: '',
  firstname: '',
  lastname: '',
  message: '',
  maxCharCount: 250,
  isSending: false
})

function checkWordCount(event: any) {
  const input = event.target.value;
  if (input.length > form.maxCharCount) {
    form.message = input.slice(0, form.maxCharCount);
  }
}


async function sendMessage() {
  if (!form.email) {
    useFunctions.toast('Email field is compulsory', 'warning')
    return;
  }

  if (!form.message) {
    useFunctions.toast('Please type a message', 'warning')
    return;
  }

  try {
    form.isSending = true
    const resp = await api.sendContactMessage(form)
    useFunctions.toast('Thank you for contacting us, we will reply you soon.', 'success')
    form.firstname = form.lastname = form.email = form.message = ''
    console.log(resp);
    form.isSending = false
  } catch (error) {
    form.isSending = false
  }

}







const locations = [
  {
    name: "United Kingdom",
    details: [
      {
        type: "text",
        icon: "bi bi-geo-alt",
        value: "International House, 24 Holborn Viaduct, London, EC1A 2BN, United Kingdom.",
      },
      {
        type: "text",
        icon: "bi bi-geo-alt",
        value: "21 Gillabbey Terrace, Gillabbey Street, Cork, T12 KPN4, Republic of Ireland.",
      },
      {
        type: "link",
        icon: "bi bi-envelope",
        value: "enquiries@portrec.ng",
        href: "mailto:enquiries@portrec.ng",
      },
    ],
  },
  {
    name: "Nigeria",
    details: [
      {
        type: "text",
        icon: "bi bi-geo-alt",
        value: "2nd Floor, 1 Adeola Adeoye Street, Toyin Street, Ikeja, Lagos, Nigeria.",
      },
      {
        type: "link",
        icon: "bi bi-envelope",
        value: "enquiries@portrec.ng",
        href: "mailto:enquiries@portrec.ng",
      },
      // {
      //   type: "link",
      //   icon: "bi bi-telephone",
      //   value: "+234 (1) 700-1770",
      //   href: "tel:+234 (1) 700-1770",
      // },
      {
        type: "link",
        icon: "bi bi-telephone",
        value: "+234 (0) 915-341-4314",
        href: "tel:+234 (0) 915-341-4314",
      },
    ],
  },
];
</script>

<style scoped>
.mapswrapper {
  background: #fff;
  position: relative
}

.mapswrapper iframe {
  border: 0;
  position: relative;
  z-index: 2;
  width: 100%;
}

.mapswrapper a {
  color: rgba(0, 0, 0, 0);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0
}
</style>