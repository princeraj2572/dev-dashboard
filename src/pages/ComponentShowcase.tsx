import { useState } from 'react'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Card from '@/components/common/Card'
import Badge from '@/components/common/Badge'
import Alert from '@/components/common/Alert'
import ProgressBar from '@/components/common/ProgressBar'
import Modal from '@/components/common/Modal'
import Section from '@/components/common/Section'
import StatCard from '@/components/cards/StatCard'

export const ComponentShowcase = () => {
  const [inputValue, setInputValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<'success' | 'error' | 'warning' | 'info' | null>(null)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <Section
        title="🎨 UI Component Showcase"
        subtitle="Explore all available components and design patterns"
      />

      {/* Buttons Section */}
      <Card>
        <Section
          title="Buttons"
          subtitle="Different button variants and sizes"
          className="mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Primary</p>
            <Button>Primary Button</Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Secondary</p>
            <Button variant="secondary">Secondary Button</Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Danger</p>
            <Button variant="danger">Danger Button</Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Ghost</p>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </div>

        <div className="mt-6 border-t pt-6 dark:border-slate-700">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sizes</p>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button fullWidth>Full Width</Button>
          </div>
        </div>
      </Card>

      {/* Input Section */}
      <Card>
        <Section
          title="Input Fields"
          subtitle="Text input components with validation"
          className="mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Standard Input"
            value={inputValue}
            onChange={setInputValue}
            placeholder="Enter text here"
            helperText="This is a helper text"
          />
          <Input
            label="Input with Error"
            value="Invalid value"
            onChange={() => {}}
            error="This field has an error"
          />
          <Input
            label="Required Field"
            value=""
            onChange={() => {}}
            required
            placeholder="This field is required"
          />
          <Input
            label="Disabled Input"
            value="Disabled"
            onChange={() => {}}
            disabled
            placeholder="This input is disabled"
          />
        </div>
      </Card>

      {/* Badges Section */}
      <Card>
        <Section
          title="Badges"
          subtitle="Status and label badges"
          className="mb-6"
        />
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" size="md">Large Default</Badge>
            <Badge variant="success" size="md">Large Success</Badge>
            <Badge variant="warning" size="md">Large Warning</Badge>
            <Badge variant="error" size="md">Large Error</Badge>
            <Badge variant="info" size="md">Large Info</Badge>
          </div>
        </div>
      </Card>

      {/* Alerts Section */}
      <Card>
        <Section
          title="Alerts"
          subtitle="Alert messages and notifications"
          className="mb-6"
        />
        <div className="space-y-3">
          <Alert
            type="success"
            title="✓ Success Alert"
            onClose={() => setSelectedAlert(null)}
          >
            This is a success alert message. Everything went according to plan!
          </Alert>
          <Alert
            type="error"
            title="⚠️ Error Alert"
            onClose={() => setSelectedAlert(null)}
          >
            This is an error alert message. Something went wrong.
          </Alert>
          <Alert
            type="warning"
            title="⚡ Warning Alert"
            onClose={() => setSelectedAlert(null)}
          >
            This is a warning alert message. Please be careful.
          </Alert>
          <Alert
            type="info"
            title="ℹ️ Info Alert"
            onClose={() => setSelectedAlert(null)}
          >
            This is an info alert message. Here's some useful information.
          </Alert>
        </div>
      </Card>

      {/* Progress Bar Section */}
      <Card>
        <Section
          title="Progress Bars"
          subtitle="Visual progress indicators"
          className="mb-6"
        />
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Size Variants</p>
            <div className="space-y-3">
              <ProgressBar value={30} max={100} size="sm" />
              <ProgressBar value={60} max={100} size="md" />
              <ProgressBar value={90} max={100} size="lg" />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Color Variants</p>
            <div className="space-y-3">
              <ProgressBar value={40} max={100} variant="primary" />
              <ProgressBar value={60} max={100} variant="success" />
              <ProgressBar value={70} max={100} variant="warning" />
              <ProgressBar value={80} max={100} variant="danger" />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">With Labels</p>
            <ProgressBar value={75} max={100} showLabel />
          </div>
        </div>
      </Card>

      {/* Stat Cards Section */}
      <Card>
        <Section
          title="Stat Cards"
          subtitle="Key metrics and statistics display"
          className="mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Total Users"
            value={2543}
            unit="users"
            icon="👥"
            trend="up"
            change={12}
          />
          <StatCard
            title="Revenue"
            value="$45,230"
            icon="💰"
            trend="up"
            change={8}
          />
          <StatCard
            title="Conversion"
            value="3.24%"
            icon="📊"
            trend="down"
            change={-2}
          />
          <StatCard
            title="Engagement"
            value="87%"
            icon="📈"
            trend="up"
            change={5}
          />
          <StatCard
            title="Bounce Rate"
            value="32%"
            icon="⏱️"
            trend="down"
            change={-4}
          />
          <StatCard
            title="Avg Session"
            value="4m 23s"
            icon="⏳"
            trend="neutral"
          />
        </div>
      </Card>

      {/* Modal Section */}
      <Card>
        <Section
          title="Modal Dialog"
          subtitle="Modal and dialog components"
          className="mb-6"
        />
        <Button onClick={() => setIsModalOpen(true)}>
          Open Modal
        </Button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Welcome to the Modal!"
          actions={
            <>
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
              >
                Confirm
              </Button>
            </>
          }
        >
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This is a modal dialog component. It's perfect for confirmations, forms, and important notifications.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              You can include any content inside a modal, including other components!
            </p>
          </div>
        </Modal>
      </Card>

      {/* Color Palette Section */}
      <Card>
        <Section
          title="Color Palette"
          subtitle="Available colors and their uses"
          className="mb-6"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <div className="w-full h-16 bg-indigo-600 rounded mb-2"></div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Primary</p>
          </div>
          <div>
            <div className="w-full h-16 bg-green-600 rounded mb-2"></div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Success</p>
          </div>
          <div>
            <div className="w-full h-16 bg-yellow-600 rounded mb-2"></div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Warning</p>
          </div>
          <div>
            <div className="w-full h-16 bg-red-600 rounded mb-2"></div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Danger</p>
          </div>
          <div>
            <div className="w-full h-16 bg-blue-600 rounded mb-2"></div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Info</p>
          </div>
          <div>
            <div className="w-full h-16 bg-gray-600 rounded mb-2"></div>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Gray</p>
          </div>
        </div>
      </Card>

      {/* Typography Section */}
      <Card>
        <Section
          title="Typography"
          subtitle="Text styles and hierarchy"
          className="mb-6"
        />
        <div className="space-y-4">
          <div>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">Heading 1 - Text 4xl</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">Heading 2 - Text 3xl</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">Heading 3 - Text 2xl</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">Subheading - Text lg</p>
          </div>
          <div>
            <p className="text-base text-gray-700 dark:text-gray-300">Body text - Text base. This is regular body content</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Small text - Text sm. This is smaller supporting text</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-500">Extra small - Text xs. This is the smallest text size</p>
          </div>
        </div>
      </Card>

      {/* Footer */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2 text-indigo-900 dark:text-indigo-300">🎉 All Components Ready!</p>
          <p className="text-gray-700 dark:text-gray-300">
            Use these components throughout the application to maintain consistent design and user experience.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default ComponentShowcase
