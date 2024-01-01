(ns my-todo-app.core
    (:require
      [reagent.core :as r]
      [reagent.dom :as d]))

;; -------------------------
;; Views

;; this is for console logging 
(def log (.-log js/console))
;; end of console logging

(defn toggle-status [current-status]
  (not current-status))

(def todos (r/atom [{:task "Boil the pasta" :color "orange" :completed? true}
            {:task "Grind the basil" :color "green" :completed? true}
            {:task "Fry the garlic" :color "blue" :completed?? false}
            {:task "Fry the garlic again you bitch!" :color "red" :completed? false}
            {:task "And it works for our own good!" :color "magenta" :completed? true}
            {:task "I own the year" :color "chocolate" :completed? true}        ]))

(defn todo-item [todo-map]
  (if (:completed? todo-map)
    [:li.completed? {:style {:color (:color todo-map)}} (:task todo-map)]
    [:li {:style {:color "red"}} (:task todo-map)])
  )

(defn todo-listings []
  [:span
   [:h5 "Tasks"]
   [:ul {:style {:list-style "square"}}
    (for [todo @todos]
      [todo-item todo])]])


(defn todo-form [] 
  (let[new-task (r/atom "")
       task-colour (r/atom "")
       task-status (r/atom false)]
   (fn []
     [:form {:on-submit #((-> % .preventDefault)
                          (when-not (or (= @new-task "") (= @task-colour ""))
                            (log "Task: " @new-task " colour:" @task-colour " status:" @task-status);;TODO remove this line and line 10 too
                            (swap! todos conj {:task @new-task :color @task-colour :completed? @task-status})
                            (reset! new-task "")
                            (reset! task-colour "")))}
      [:form-group
       [:label "Task"]
       [:input {:type "text"
                :name "task"
                :id "task"
                :value @new-task
                :on-change #(reset! new-task (-> % .-target .-value))
                :placeholder "Add task"}]]
      [:form-group
       [:label "Colour"]
       [:input {:type "text"
                :name "color"
                :id "color"
                :value @task-colour
                :on-change #(reset! task-colour (-> % .-target .-value))
                :placeholder "Type colour"}]] [:br]
      [:form-group {:id "status-checkbox-formgroup"}
       [:label "Complete?"]
       [:input {:type "checkbox"
                :value @task-status
                :on-click #((swap! task-status toggle-status @task-status))}]]
      [:input {:type "submit" 
               :value "Add New Task"}]])))

(defn home-page []
  [:div [:h2 "Todo App"]
   [:p "Add a new item below:"]
   [todo-form]
   [todo-listings]])

;; -------------------------
;; Initialize app

(defn mount-root []
  (d/render [home-page] (.getElementById js/document "app")))

(defn ^:export init! []
  (mount-root))
