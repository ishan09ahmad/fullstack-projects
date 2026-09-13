import { CheckSquare } from "lucide-react";
import { features } from "../utils/data.js";

export default function Features() {
  return (
    <main className="min-h-[calc(100vh-70px)] bg-white">
     
      <section className="px-6 pb-16 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-600">
            <CheckSquare size={16} />
            Everything you need to stay organized
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Powerful features.
            <span className="block text-violet-600">Simple productivity.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500">
            TaskFlow gives you everything you need to organize your tasks, focus
            on what matters, and get more done without the clutter.
          </p>
        </div>
      </section>

   
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-275 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-violet-100 hover:shadow-md"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Icon size={21} strokeWidth={2} />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>


      <section className="bg-[#111c2d] px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Ready to get things done?
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-300">
            Start organizing your tasks and build a more productive workflow.
          </p>
        </div>
      </section>
    </main>
  );
}
