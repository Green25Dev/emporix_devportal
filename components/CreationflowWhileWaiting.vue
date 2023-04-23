<template>
  <section class="while">
    <div class="content-wrapper">
      <div class="title">
        {{ $t('tenant.waiting.while.title') }}
      </div>
      <div class="links-wrapper">
        <div class="links-content">
          <div class="links-title">
            <img
              alt="links"
              class="links-img"
              src="/waiting-box.svg"
            >
            <div class="links-title-text">
              <span>See </span>
              <span class="text-highlight">Use Cases</span>
            </div>
          </div>
          <div class="links">
            <a
              v-for="link in links.cases"
              :key="link.name"
              class="link"
              :href="link.href"
              target="_blank"
            >
              <LinkWithArrow :text="$t(link.name)" />
            </a>
          </div>
        </div>
        <div class="links-content">
          <div class="links-title">
            <img
              alt="links"
              class="links-img"
              src="/waiting-box.svg"
            >
            <div class="links-title-text">
              <span>Browse </span>
              <span class="text-highlight">Documentation</span>
            </div>
          </div>
          <div class="links">
            <a
              v-for="link in links.docs"
              :key="link.name"
              class="link"
              :href="link.href"
              target="_blank"
            >
              <LinkWithArrow :text="$t(link.name)" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LinkWithArrow from '~/components/LinkWithArrow'

export default {
  name: 'CreationflowWhileWaiting',
  components: { LinkWithArrow },
  data () {
    return {
      links: {
        cases: [
          {
            name: 'Grocery',
            href: 'https://www.emporix.com/grocery-commerce-software'
          },
          {
            name: 'Retail',
            href: 'https://www.emporix.com/grocery-commerce-software'
          },
          {
            name: 'Brand and Manufacturing',
            href: 'https://www.emporix.com/use-case-brands-and-manufacturing'
          },
          {
            name: 'B2B Wholesale',
            href: 'https://www.emporix.com/b2b-wholesale-platform'
          },
          {
            name: 'B2B Commerce',
            href: 'https://www.emporix.com/b2b-ecommerce-platform'
          },
          {
            name: 'Multi-Site',
            href: 'https://www.emporix.com/use-case-multi-site'
          },
          {
            name: 'Complex Commerce',
            href: 'https://www.emporix.com/complex-commerce'
          }
        ],
        docs: [
          {
            name: 'Getting started',
            href: 'https://developer.emporix.io/getting-started/introduction/'
          },
          {
            name: 'Management Dashboard',
            href: 'https://developer.emporix.io/management-dashboard/introduction'
          },
          {
            name: 'Core Commerce',
            href: 'https://developer.emporix.io/core-commerce/introduction'
          },
          {
            name: 'Third-Party Integrations',
            href: 'https://developer.emporix.io/integrations/identity-providers/identity-providers'
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.while {
  max-width: 1280px;
  width: 100%;
  height: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid $brand-grey-200;

  .content-wrapper {
    padding: 32px 16px;
    display: flex;
    flex-direction: column;
    background: white;
    z-index: 1;

    .title {
      color: black;
      font-weight: bold;
      font-size: 48px;
      line-height: 58px;
    }

    .text-highlight {
      color: $brand-blue-500;
    }

    .links-wrapper {
      display: flex;

      .links-content {
        display: flex;
        flex: 1;
        flex-direction: column;
        .links-title {
          display: flex;
          align-items: center;
          .links-img {
            margin: 0 16px;
            height: 80px;
          }
          .links-title-text {
            margin-left: 32px;
            font-weight: bold;
            font-size: 32px;
            line-height: 36px;
          }
        }
        .links {
          display: flex;
          flex-flow: wrap;
          margin-top: 48px;
          .link {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 264px;
            margin: 0 32px 16px 16px;
            text-decoration: none;

            .link-text {
              font-weight: bold;
              font-size: 18px;
              line-height: 22px;
              text-decoration: none;
              color: black;
              transition: color 200ms;
            }

            &:hover {
              .link-text {
                color: $brand-blue-500;
              }
            }
          }
        }

      }
    }
  }

}
</style>
