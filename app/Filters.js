/**
 * This component creates a series of expandable filter sections, each with a set of checkboxes based on the pre-defined options in the `filters` constant. 
 * It also renders a `MeshTree` component for the "mesh" filter option.
 */

import {Dialog, Disclosure, Transition} from "@headlessui/react";
import {MinusIcon, PlusIcon} from "@heroicons/react/20/solid";
import MeshTree from "@/app/MeshTree";


/**
 * Array of objects that define the available filter options for different categories. 
 * Each object has an id, name, and options array containing objects with value, label, and checked properties.

 */
export const filters = [
    {
        id: 'publications',
        name: 'Publications',
        options: [
            {value: 'highest-count', label: 'Highest Count', checked: false},
            {value: 'recent-five', label: 'Recent - 5 Years', checked: false},
            {value: 'recent-ten', label: 'Recent - 10 Years', checked: false},
            {value: 'main-author', label: 'Main Author', checked: false}
        ],
    },
    {
        id: 'expertise',
        name: 'Expertise',
        options: [
            {value: 'clinical-trials', label: 'Clinical Trials', checked: false},
            {value: 'wearables', label: 'Wearables', checked: false},
            {value: 'programming', label: 'Programming', checked: false}
        ],
    },
    {
        id: 'institution',
        name: 'Institution',
        options: [
            {value: 'prestige', label: 'Prestige', checked: false},
            {value: 'location', label: 'Location', checked: false},
            {value: 'ranking', label: 'Ranking', checked: false},
        ],
    },
    {
        id: 'mesh',
        name: 'Mesh Terms',
        options: [
            {value: 'mesh', label: 'mesh', checked: false},
        ],
    },
]

/**
 * `Filters` Component function renders filter sections using  data defined in the above constant. It iterates over the array and creates a toggleable `Disclosure` component for each filter section.
 * Inside `Disclosure`, `Disclosure.Button` displays filter section's name and an icon (MinusIcon or PlusIcon) based on the section's state (expanded or collapsed).
 * `Disclosure.Panel` contains the actual filter options as checkboxes. It iterates over `section.options` array and creates a checkbox input and a label for each option. For "mesh" id option, it renders the `MeshTree` component instead of a checkbox.
 */
export default function Filters() {
    return (
      <div>
        {filters.map((section) => (
          <Disclosure as="div" key={section.id} className="border-b border-gray-200 px-4 py-6" data-testid={`${section.id}-section`}>
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button
                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                  >
                    <span className="font-medium text-gray-900">{section.name}</span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) =>
                      section.id == "mesh" ? (
                        <div key={option.value}>
                          <MeshTree data-testid="mesh-tree" />
                        </div>
                      ) : (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            defaultChecked={option.checked}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    );
  }